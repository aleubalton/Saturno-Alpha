package com.ubal.test.service;

import com.ubal.test.service.dto.IntervaloDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Intervalo.
 */
public interface IntervaloService {

    /**
     * Save a intervalo.
     *
     * @param intervaloDTO the entity to save
     * @return the persisted entity
     */
    IntervaloDTO save(IntervaloDTO intervaloDTO);

    /**
     * Get all the intervalos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<IntervaloDTO> findAll(Pageable pageable);

    /**
     * Get the "id" intervalo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    IntervaloDTO findOne(Long id);

    /**
     * Delete the "id" intervalo.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
