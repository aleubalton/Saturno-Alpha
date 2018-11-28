package com.ubal.test.service.impl;

import com.ubal.test.service.DiaNoLaborableService;
import com.ubal.test.domain.DiaNoLaborable;
import com.ubal.test.repository.DiaNoLaborableRepository;
import com.ubal.test.service.dto.DiaNoLaborableDTO;
import com.ubal.test.service.mapper.DiaNoLaborableMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing DiaNoLaborable.
 */
@Service
@Transactional
public class DiaNoLaborableServiceImpl implements DiaNoLaborableService {

    private final Logger log = LoggerFactory.getLogger(DiaNoLaborableServiceImpl.class);

    private final DiaNoLaborableRepository diaNoLaborableRepository;

    private final DiaNoLaborableMapper diaNoLaborableMapper;

    public DiaNoLaborableServiceImpl(DiaNoLaborableRepository diaNoLaborableRepository, DiaNoLaborableMapper diaNoLaborableMapper) {
        this.diaNoLaborableRepository = diaNoLaborableRepository;
        this.diaNoLaborableMapper = diaNoLaborableMapper;
    }

    /**
     * Save a diaNoLaborable.
     *
     * @param diaNoLaborableDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DiaNoLaborableDTO save(DiaNoLaborableDTO diaNoLaborableDTO) {
        log.debug("Request to save DiaNoLaborable : {}", diaNoLaborableDTO);
        DiaNoLaborable diaNoLaborable = diaNoLaborableMapper.toEntity(diaNoLaborableDTO);
        diaNoLaborable = diaNoLaborableRepository.save(diaNoLaborable);
        return diaNoLaborableMapper.toDto(diaNoLaborable);
    }

    /**
     * Get all the diaNoLaborables.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DiaNoLaborableDTO> findAll() {
        log.debug("Request to get all DiaNoLaborables");
        return diaNoLaborableRepository.findAll().stream()
            .map(diaNoLaborableMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one diaNoLaborable by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public DiaNoLaborableDTO findOne(Long id) {
        log.debug("Request to get DiaNoLaborable : {}", id);
        DiaNoLaborable diaNoLaborable = diaNoLaborableRepository.findOne(id);
        return diaNoLaborableMapper.toDto(diaNoLaborable);
    }

    /**
     * Delete the diaNoLaborable by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DiaNoLaborable : {}", id);
        diaNoLaborableRepository.delete(id);
    }
}
