package com.ubal.test.repository;

import com.ubal.test.domain.TipoDeServicio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TipoDeServicio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoDeServicioRepository extends JpaRepository<TipoDeServicio, Long> {

}
