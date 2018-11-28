package com.ubal.test.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ubal.test.service.TurnoService;
import com.ubal.test.web.rest.errors.BadRequestAlertException;
import com.ubal.test.web.rest.util.HeaderUtil;
import com.ubal.test.service.dto.TurnoDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Turno.
 */
@RestController
@RequestMapping("/api")
public class TurnoResource {

    private final Logger log = LoggerFactory.getLogger(TurnoResource.class);

    private static final String ENTITY_NAME = "turno";

    private final TurnoService turnoService;

    public TurnoResource(TurnoService turnoService) {
        this.turnoService = turnoService;
    }

    /**
     * POST  /turnos : Create a new turno.
     *
     * @param turnoDTO the turnoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new turnoDTO, or with status 400 (Bad Request) if the turno has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/turnos")
    @Timed
    public ResponseEntity<TurnoDTO> createTurno(@Valid @RequestBody TurnoDTO turnoDTO) throws URISyntaxException {
        log.debug("REST request to save Turno : {}", turnoDTO);
        if (turnoDTO.getId() != null) {
            throw new BadRequestAlertException("A new turno cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TurnoDTO result = turnoService.save(turnoDTO);
        return ResponseEntity.created(new URI("/api/turnos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /turnos : Updates an existing turno.
     *
     * @param turnoDTO the turnoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated turnoDTO,
     * or with status 400 (Bad Request) if the turnoDTO is not valid,
     * or with status 500 (Internal Server Error) if the turnoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/turnos")
    @Timed
    public ResponseEntity<TurnoDTO> updateTurno(@Valid @RequestBody TurnoDTO turnoDTO) throws URISyntaxException {
        log.debug("REST request to update Turno : {}", turnoDTO);
        if (turnoDTO.getId() == null) {
            return createTurno(turnoDTO);
        }
        TurnoDTO result = turnoService.save(turnoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, turnoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /turnos : get all the turnos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of turnos in body
     */
    @GetMapping("/turnos")
    @Timed
    public List<TurnoDTO> getAllTurnos() {
        log.debug("REST request to get all Turnos");
        return turnoService.findAll();
        }

    /**
     * GET  /turnos/:id : get the "id" turno.
     *
     * @param id the id of the turnoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the turnoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/turnos/{id}")
    @Timed
    public ResponseEntity<TurnoDTO> getTurno(@PathVariable Long id) {
        log.debug("REST request to get Turno : {}", id);
        TurnoDTO turnoDTO = turnoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(turnoDTO));
    }

    /**
     * DELETE  /turnos/:id : delete the "id" turno.
     *
     * @param id the id of the turnoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/turnos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTurno(@PathVariable Long id) {
        log.debug("REST request to delete Turno : {}", id);
        turnoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
