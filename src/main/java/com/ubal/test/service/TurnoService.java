package com.ubal.test.service;

import com.ubal.test.service.dto.TurnoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Turno.
 */
public interface TurnoService {

    /**
     * Save a turno.
     *
     * @param turnoDTO the entity to save
     * @return the persisted entity
     */
    TurnoDTO save(TurnoDTO turnoDTO);

    /**
     * Get all the turnos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TurnoDTO> findAll(Pageable pageable);

    /**
     * Get the "id" turno.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TurnoDTO findOne(Long id);

    /**
     * Delete the "id" turno.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
