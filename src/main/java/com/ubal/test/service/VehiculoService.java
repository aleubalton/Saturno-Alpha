package com.ubal.test.service;

import com.ubal.test.service.dto.VehiculoDTO;
import java.util.List;

/**
 * Service Interface for managing Vehiculo.
 */
public interface VehiculoService {

    /**
     * Save a vehiculo.
     *
     * @param vehiculoDTO the entity to save
     * @return the persisted entity
     */
    VehiculoDTO save(VehiculoDTO vehiculoDTO);

    /**
     * Get all the vehiculos.
     *
     * @return the list of entities
     */
    List<VehiculoDTO> findAll();

    /**
     * Get the "id" vehiculo.
     *
     * @param id the id of the entity
     * @return the entity
     */
    VehiculoDTO findOne(Long id);

    /**
     * Delete the "id" vehiculo.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
