package com.ubal.test.repository;

import com.ubal.test.domain.Turno;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Turno entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TurnoRepository extends JpaRepository<Turno, Long> {
    @Query("select distinct turno from Turno turno left join fetch turno.servicios")
    List<Turno> findAllWithEagerRelationships();

    @Query("select turno from Turno turno left join fetch turno.servicios where turno.id =:id")
    Turno findOneWithEagerRelationships(@Param("id") Long id);

}
