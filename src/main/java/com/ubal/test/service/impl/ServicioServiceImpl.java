package com.ubal.test.service.impl;

import com.ubal.test.service.ServicioService;
import com.ubal.test.domain.Servicio;
import com.ubal.test.repository.ServicioRepository;
import com.ubal.test.service.dto.ServicioDTO;
import com.ubal.test.service.mapper.ServicioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Servicio.
 */
@Service
@Transactional
public class ServicioServiceImpl implements ServicioService {

    private final Logger log = LoggerFactory.getLogger(ServicioServiceImpl.class);

    private final ServicioRepository servicioRepository;

    private final ServicioMapper servicioMapper;

    public ServicioServiceImpl(ServicioRepository servicioRepository, ServicioMapper servicioMapper) {
        this.servicioRepository = servicioRepository;
        this.servicioMapper = servicioMapper;
    }

    /**
     * Save a servicio.
     *
     * @param servicioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ServicioDTO save(ServicioDTO servicioDTO) {
        log.debug("Request to save Servicio : {}", servicioDTO);
        Servicio servicio = servicioMapper.toEntity(servicioDTO);
        servicio = servicioRepository.save(servicio);
        return servicioMapper.toDto(servicio);
    }

    /**
     * Get all the servicios.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ServicioDTO> findAll() {
        log.debug("Request to get all Servicios");
        return servicioRepository.findAllWithEagerRelationships().stream()
            .map(servicioMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one servicio by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ServicioDTO findOne(Long id) {
        log.debug("Request to get Servicio : {}", id);
        Servicio servicio = servicioRepository.findOneWithEagerRelationships(id);
        return servicioMapper.toDto(servicio);
    }

    /**
     * Delete the servicio by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Servicio : {}", id);
        servicioRepository.delete(id);
    }
}
