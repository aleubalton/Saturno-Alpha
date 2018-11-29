package com.ubal.test.repository;

import com.ubal.test.domain.Vehiculo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Vehiculo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {

}