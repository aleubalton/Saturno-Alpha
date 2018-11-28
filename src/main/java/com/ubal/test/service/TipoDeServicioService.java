package com.ubal.test.service;

import com.ubal.test.service.dto.TipoDeServicioDTO;
import java.util.List;

/**
 * Service Interface for managing TipoDeServicio.
 */
public interface TipoDeServicioService {

    /**
     * Save a tipoDeServicio.
     *
     * @param tipoDeServicioDTO the entity to save
     * @return the persisted entity
     */
    TipoDeServicioDTO save(TipoDeServicioDTO tipoDeServicioDTO);

    /**
     * Get all the tipoDeServicios.
     *
     * @return the list of entities
     */
    List<TipoDeServicioDTO> findAll();

    /**
     * Get the "id" tipoDeServicio.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TipoDeServicioDTO findOne(Long id);

    /**
     * Delete the "id" tipoDeServicio.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
