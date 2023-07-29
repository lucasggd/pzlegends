package pzlegends.com.pzlegends.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pzlegends.com.pzlegends.model.Category;
import pzlegends.com.pzlegends.model.Run;
import pzlegends.com.pzlegends.repository.CategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private RunService runService;

    public List<Category> findAll() {
        return categoryRepository.findAllByOrderByNameAsc();
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id).get();
    }

    public List<Run> findAllByCategoryId(Long id) {
        return runService.findAllByCategoryId(id);
    }
}
