package com.ubal.test.repository;

import com.ubal.test.domain.Mascota;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Mascota entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Long> {

}
