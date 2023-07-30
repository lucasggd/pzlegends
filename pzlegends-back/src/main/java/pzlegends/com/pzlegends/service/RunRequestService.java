package pzlegends.com.pzlegends.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import pzlegends.com.pzlegends.config.ApiException;
import pzlegends.com.pzlegends.interceptor.JwtTokenInterceptor;
import pzlegends.com.pzlegends.model.Run;
import pzlegends.com.pzlegends.model.RunRequest;
import pzlegends.com.pzlegends.model.User;
import pzlegends.com.pzlegends.model.dto.RunDTO;
import pzlegends.com.pzlegends.model.enums.RunRequestStatusEnum;
import pzlegends.com.pzlegends.repository.RunRequestRepository;

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

    public List<RunRequest> findAll(){
        return runRequestRepository.findAll();
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

    public RunRequest response(Long id, boolean bool){

        var run = runRequestRepository.findById(id);

        if (run.isEmpty()) throw new ApiException(HttpStatus.NOT_FOUND, "notFound");

        run.get().setResponse_by(new User(JwtTokenInterceptor.getUserId()));
        run.get().setResponse_at(new Date());

        if (bool){
            run.get().setRunRequestStatus(RunRequestStatusEnum.APPROVED);
            runRequestRepository.save(run.get());
            runService.newRun(new Run(run.get()));
        }
        else {
            run.get().setRunRequestStatus(RunRequestStatusEnum.REFUSED);
            runRequestRepository.save(run.get());
        }

        return run.get();
    }
}
