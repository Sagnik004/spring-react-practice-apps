package com.sagnikchakraborty.bookapi.repository;

import com.sagnikchakraborty.bookapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
