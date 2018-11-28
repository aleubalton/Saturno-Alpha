package com.ubal.test.service.impl;

import com.ubal.test.service.VehiculoService;
import com.ubal.test.domain.Vehiculo;
import com.ubal.test.repository.VehiculoRepository;
import com.ubal.test.service.dto.VehiculoDTO;
import com.ubal.test.service.mapper.VehiculoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Vehiculo.
 */
@Service
@Transactional
public class VehiculoServiceImpl implements VehiculoService {

    private final Logger log = LoggerFactory.getLogger(VehiculoServiceImpl.class);

    private final VehiculoRepository vehiculoRepository;

    private final VehiculoMapper vehiculoMapper;

    public VehiculoServiceImpl(VehiculoRepository vehiculoRepository, VehiculoMapper vehiculoMapper) {
        this.vehiculoRepository = vehiculoRepository;
        this.vehiculoMapper = vehiculoMapper;
    }

    /**
     * Save a vehiculo.
     *
     * @param vehiculoDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public VehiculoDTO save(VehiculoDTO vehiculoDTO) {
        log.debug("Request to save Vehiculo : {}", vehiculoDTO);
        Vehiculo vehiculo = vehiculoMapper.toEntity(vehiculoDTO);
        vehiculo = vehiculoRepository.save(vehiculo);
        return vehiculoMapper.toDto(vehiculo);
    }

    /**
     * Get all the vehiculos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<VehiculoDTO> findAll() {
        log.debug("Request to get all Vehiculos");
        return vehiculoRepository.findAll().stream()
            .map(vehiculoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one vehiculo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public VehiculoDTO findOne(Long id) {
        log.debug("Request to get Vehiculo : {}", id);
        Vehiculo vehiculo = vehiculoRepository.findOne(id);
        return vehiculoMapper.toDto(vehiculo);
    }

    /**
     * Delete the vehiculo by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Vehiculo : {}", id);
        vehiculoRepository.delete(id);
    }
}
