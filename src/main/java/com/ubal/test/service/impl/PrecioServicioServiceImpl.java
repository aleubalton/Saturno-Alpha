package com.ubal.test.service.impl;

import com.ubal.test.service.PrecioServicioService;
import com.ubal.test.domain.PrecioServicio;
import com.ubal.test.repository.PrecioServicioRepository;
import com.ubal.test.service.dto.PrecioServicioDTO;
import com.ubal.test.service.mapper.PrecioServicioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing PrecioServicio.
 */
@Service
@Transactional
public class PrecioServicioServiceImpl implements PrecioServicioService {

    private final Logger log = LoggerFactory.getLogger(PrecioServicioServiceImpl.class);

    private final PrecioServicioRepository precioServicioRepository;

    private final PrecioServicioMapper precioServicioMapper;

    public PrecioServicioServiceImpl(PrecioServicioRepository precioServicioRepository, PrecioServicioMapper precioServicioMapper) {
        this.precioServicioRepository = precioServicioRepository;
        this.precioServicioMapper = precioServicioMapper;
    }

    /**
     * Save a precioServicio.
     *
     * @param precioServicioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PrecioServicioDTO save(PrecioServicioDTO precioServicioDTO) {
        log.debug("Request to save PrecioServicio : {}", precioServicioDTO);
        PrecioServicio precioServicio = precioServicioMapper.toEntity(precioServicioDTO);
        precioServicio = precioServicioRepository.save(precioServicio);
        return precioServicioMapper.toDto(precioServicio);
    }

    /**
     * Get all the precioServicios.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PrecioServicioDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PrecioServicios");
        return precioServicioRepository.findAll(pageable)
            .map(precioServicioMapper::toDto);
    }

    /**
     * Get one precioServicio by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PrecioServicioDTO findOne(Long id) {
        log.debug("Request to get PrecioServicio : {}", id);
        PrecioServicio precioServicio = precioServicioRepository.findOne(id);
        return precioServicioMapper.toDto(precioServicio);
    }

    /**
     * Delete the precioServicio by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PrecioServicio : {}", id);
        precioServicioRepository.delete(id);
    }
}
