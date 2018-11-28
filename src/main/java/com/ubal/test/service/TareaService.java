package com.ubal.test.service;

import com.ubal.test.service.dto.TareaDTO;
import java.util.List;

/**
 * Service Interface for managing Tarea.
 */
public interface TareaService {

    /**
     * Save a tarea.
     *
     * @param tareaDTO the entity to save
     * @return the persisted entity
     */
    TareaDTO save(TareaDTO tareaDTO);

    /**
     * Get all the tareas.
     *
     * @return the list of entities
     */
    List<TareaDTO> findAll();

    /**
     * Get the "id" tarea.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TareaDTO findOne(Long id);

    /**
     * Delete the "id" tarea.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
