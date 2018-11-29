package com.ubal.test.repository;

import com.ubal.test.domain.Intervalo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Intervalo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IntervaloRepository extends JpaRepository<Intervalo, Long> {

}
