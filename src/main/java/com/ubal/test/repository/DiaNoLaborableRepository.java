package com.ubal.test.repository;

import com.ubal.test.domain.DiaNoLaborable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DiaNoLaborable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiaNoLaborableRepository extends JpaRepository<DiaNoLaborable, Long> {

}
