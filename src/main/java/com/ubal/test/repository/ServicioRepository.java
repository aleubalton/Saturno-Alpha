package com.ubal.test.repository;

import com.ubal.test.domain.Servicio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Servicio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    @Query("select distinct servicio from Servicio servicio left join fetch servicio.tareas")
    List<Servicio> findAllWithEagerRelationships();

    @Query("select servicio from Servicio servicio left join fetch servicio.tareas where servicio.id =:id")
    Servicio findOneWithEagerRelationships(@Param("id") Long id);

}
