package com.ubal.test.service.impl;

import com.ubal.test.service.IntervaloService;
import com.ubal.test.domain.Intervalo;
import com.ubal.test.repository.IntervaloRepository;
import com.ubal.test.service.dto.IntervaloDTO;
import com.ubal.test.service.mapper.IntervaloMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Intervalo.
 */
@Service
@Transactional
public class IntervaloServiceImpl implements IntervaloService {

    private final Logger log = LoggerFactory.getLogger(IntervaloServiceImpl.class);

    private final IntervaloRepository intervaloRepository;

    private final IntervaloMapper intervaloMapper;

    public IntervaloServiceImpl(IntervaloRepository intervaloRepository, IntervaloMapper intervaloMapper) {
        this.intervaloRepository = intervaloRepository;
        this.intervaloMapper = intervaloMapper;
    }

    /**
     * Save a intervalo.
     *
     * @param intervaloDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public IntervaloDTO save(IntervaloDTO intervaloDTO) {
        log.debug("Request to save Intervalo : {}", intervaloDTO);
        Intervalo intervalo = intervaloMapper.toEntity(intervaloDTO);
        intervalo = intervaloRepository.save(intervalo);
        return intervaloMapper.toDto(intervalo);
    }

    /**
     * Get all the intervalos.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<IntervaloDTO> findAll() {
        log.debug("Request to get all Intervalos");
        return intervaloRepository.findAll().stream()
            .map(intervaloMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one intervalo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public IntervaloDTO findOne(Long id) {
        log.debug("Request to get Intervalo : {}", id);
        Intervalo intervalo = intervaloRepository.findOne(id);
        return intervaloMapper.toDto(intervalo);
    }

    /**
     * Delete the intervalo by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Intervalo : {}", id);
        intervaloRepository.delete(id);
    }
}
