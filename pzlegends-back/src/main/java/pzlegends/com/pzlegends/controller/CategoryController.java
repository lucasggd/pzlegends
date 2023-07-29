package pzlegends.com.pzlegends.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pzlegends.com.pzlegends.service.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(categoryService.findAll());
    }

    @GetMapping("{id}/runs")
    public ResponseEntity<?> findAllByCategoryId(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.findAllByCategoryId(id));
    }
}
