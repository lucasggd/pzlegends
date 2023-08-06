package pzlegends.com.pzlegends.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import pzlegends.com.pzlegends.config.ApiException;
import pzlegends.com.pzlegends.interceptor.JwtTokenInterceptor;
import pzlegends.com.pzlegends.model.Run;
import pzlegends.com.pzlegends.model.RunRequest;
import pzlegends.com.pzlegends.model.User;
import pzlegends.com.pzlegends.model.dto.RequestResponseDTO;
import pzlegends.com.pzlegends.model.dto.RunDTO;
import pzlegends.com.pzlegends.model.enums.RunRequestStatusEnum;
import pzlegends.com.pzlegends.repository.RunRequestRepository;

import java.awt.print.Pageable;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RunRequestService {

    @Autowired
    private RunRequestRepository runRequestRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private RunService runService;

    @Autowired
    private JavaMailSender emailSender;

    public Page<RunRequest> findAll(Integer page, Integer limit){
        return runRequestRepository.findAllByOrderByIdDesc(PageRequest.of(page, limit));
    }

    public Optional<RunRequest> findById(Long id) {
        return runRequestRepository.findById(id);
    }
    public RunRequest newRequest(RunDTO runRequest) throws Exception {
        var user = userService.findById(JwtTokenInterceptor.getUserId());

        var x = runRequestRepository.findByUserIdAndCategoryIdAndRunRequestStatus(user.getId(), runRequest.getCategoryId(), RunRequestStatusEnum.PENDING);

        if (!x.isEmpty()) throw new ApiException(HttpStatus.NOT_ACCEPTABLE,"pendingPreviousRaceInThisCategory");

        RunRequest run = new RunRequest(
                user,
                categoryService.findById(runRequest.getCategoryId()),
                runRequest.getVideoUrl(),
                runRequest.getYears(),
                runRequest.getMonths(),
                runRequest.getDays(),
                runRequest.getKills());

        return runRequestRepository.save(run);
    }

    public RunRequest response(Long id, RequestResponseDTO requestResponseDTO){

        var run = runRequestRepository.findById(id);

        if (run.isEmpty()) throw new ApiException(HttpStatus.NOT_FOUND, "notFound");

        run.get().setResponse_by(new User(JwtTokenInterceptor.getUserId()));
        run.get().setResponse_at(new Date());

        String title = "PZLegends - Resposta corrida | Categoria " + run.get().getCategory();

        if (requestResponseDTO.isApproved()){
            var oldRun = runService.findByUserIdAndCategoryId(run.get().getUser().getId(), run.get().getCategory().getId());

            oldRun.ifPresent(value -> runService.deleteRun(value));

            run.get().setRunRequestStatus(RunRequestStatusEnum.APPROVED);
            runRequestRepository.save(run.get());
            runService.newRun(new Run(run.get()));

            String text = "Parabéns " + run.get().getUser().getUsername() + ", sua corrida foi análisada e aprovada.\nSua corrida já está disponível para todos analisarem." ;

            sendEmailConfirmation(run.get().getUser().getEmail(), title, text );
        }
        else {
            run.get().setRunRequestStatus(RunRequestStatusEnum.REFUSED);
            run.get().setMessage(requestResponseDTO.getMessage());
            runRequestRepository.save(run.get());

            String text = "Olá " + run.get().getUser().getUsername() + ", Infelizmente sua corrida foi recusada, mas não desista. Siga nossas regras e envie assim que estiver de acordo. \n\nMotivo: " + requestResponseDTO.getMessage();

            sendEmailConfirmation(run.get().getUser().getEmail(), title, text );
        }

        return run.get();
    }

    private void sendEmailConfirmation(String email, String subject, String text){

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("pzlegends@outlook.com");
        message.setTo(email);
        message.setSubject(subject);
        message.setText(text);

        emailSender.send(message);

    }
}
