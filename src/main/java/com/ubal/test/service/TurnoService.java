package com.ubal.test.service;

import com.ubal.test.service.dto.TurnoDTO;
import java.util.List;

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
     * @return the list of entities
     */
    List<TurnoDTO> findAll();

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
