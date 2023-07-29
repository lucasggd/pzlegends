package pzlegends.com.pzlegends.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pzlegends.com.pzlegends.model.Category;
import pzlegends.com.pzlegends.model.Run;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findAllByOrderByNameAsc();
}
