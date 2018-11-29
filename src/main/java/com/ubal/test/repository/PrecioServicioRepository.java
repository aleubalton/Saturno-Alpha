package com.ubal.test.repository;

import com.ubal.test.domain.PrecioServicio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PrecioServicio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrecioServicioRepository extends JpaRepository<PrecioServicio, Long> {

}
