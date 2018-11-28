package com.ubal.test.service;

import com.ubal.test.service.dto.DiaNoLaborableDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing DiaNoLaborable.
 */
public interface DiaNoLaborableService {

    /**
     * Save a diaNoLaborable.
     *
     * @param diaNoLaborableDTO the entity to save
     * @return the persisted entity
     */
    DiaNoLaborableDTO save(DiaNoLaborableDTO diaNoLaborableDTO);

    /**
     * Get all the diaNoLaborables.
     *
     * @return the list of entities
     */
    List<DiaNoLaborableDTO> findAll();


    /**
     * Get the "id" diaNoLaborable.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DiaNoLaborableDTO> findOne(Long id);

    /**
     * Delete the "id" diaNoLaborable.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
