package com.podoal.podoal.domain.user.repository;


import com.podoal.podoal.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
}
