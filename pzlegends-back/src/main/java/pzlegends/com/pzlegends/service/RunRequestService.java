package pzlegends.com.pzlegends.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import pzlegends.com.pzlegends.config.ApiException;
import pzlegends.com.pzlegends.model.Run;
import pzlegends.com.pzlegends.model.RunRequest;
import pzlegends.com.pzlegends.model.dto.RunDTO;
import pzlegends.com.pzlegends.model.enums.RunRequestStatusEnum;
import pzlegends.com.pzlegends.repository.RunRequestRepository;

@Service
public class RunRequestService {

    @Autowired
    private RunRequestRepository runRequestRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryService categoryService;


    public RunRequest newRequest(RunDTO runRequest) throws Exception {
        var user = userService.findByUsername(runRequest.getUsername());

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
}
