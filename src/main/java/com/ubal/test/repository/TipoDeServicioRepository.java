package com.ubal.test.repository;

import com.ubal.test.domain.TipoDeServicio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoDeServicio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoDeServicioRepository extends JpaRepository<TipoDeServicio, Long> {

}
