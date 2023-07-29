package pzlegends.com.pzlegends.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pzlegends.com.pzlegends.model.Run;
import pzlegends.com.pzlegends.repository.RunRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RunService {

    @Autowired
    private RunRepository runRepository;

    public List<Run> findAllByCategoryId(Long id) {
        return runRepository.findAllByCategoryId(id);
    }

    public Optional<Run> findById(Long id) {
        return runRepository.findById(id);
    }
}
