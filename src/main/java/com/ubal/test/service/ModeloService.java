package com.ubal.test.service;

import com.ubal.test.service.dto.ModeloDTO;
import java.util.List;

/**
 * Service Interface for managing Modelo.
 */
public interface ModeloService {

    /**
     * Save a modelo.
     *
     * @param modeloDTO the entity to save
     * @return the persisted entity
     */
    ModeloDTO save(ModeloDTO modeloDTO);

    /**
     * Get all the modelos.
     *
     * @return the list of entities
     */
    List<ModeloDTO> findAll();

    /**
     * Get the "id" modelo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ModeloDTO findOne(Long id);

    /**
     * Delete the "id" modelo.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
