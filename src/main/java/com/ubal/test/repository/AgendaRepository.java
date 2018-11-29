package com.ubal.test.repository;

import com.ubal.test.domain.Agenda;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Agenda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgendaRepository extends JpaRepository<Agenda, Long> {
    @Query("select distinct agenda from Agenda agenda left join fetch agenda.intervalos left join fetch agenda.diaNoLaborables")
    List<Agenda> findAllWithEagerRelationships();

    @Query("select agenda from Agenda agenda left join fetch agenda.intervalos left join fetch agenda.diaNoLaborables where agenda.id =:id")
    Agenda findOneWithEagerRelationships(@Param("id") Long id);

}
