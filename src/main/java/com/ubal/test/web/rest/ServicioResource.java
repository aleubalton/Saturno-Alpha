package com.ubal.test.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ubal.test.service.ServicioService;
import com.ubal.test.web.rest.errors.BadRequestAlertException;
import com.ubal.test.web.rest.util.HeaderUtil;
import com.ubal.test.service.dto.ServicioDTO;
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
 * REST controller for managing Servicio.
 */
@RestController
@RequestMapping("/api")
public class ServicioResource {

    private final Logger log = LoggerFactory.getLogger(ServicioResource.class);

    private static final String ENTITY_NAME = "servicio";

    private final ServicioService servicioService;

    public ServicioResource(ServicioService servicioService) {
        this.servicioService = servicioService;
    }

    /**
     * POST  /servicios : Create a new servicio.
     *
     * @param servicioDTO the servicioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new servicioDTO, or with status 400 (Bad Request) if the servicio has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/servicios")
    @Timed
    public ResponseEntity<ServicioDTO> createServicio(@Valid @RequestBody ServicioDTO servicioDTO) throws URISyntaxException {
        log.debug("REST request to save Servicio : {}", servicioDTO);
        if (servicioDTO.getId() != null) {
            throw new BadRequestAlertException("A new servicio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServicioDTO result = servicioService.save(servicioDTO);
        return ResponseEntity.created(new URI("/api/servicios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /servicios : Updates an existing servicio.
     *
     * @param servicioDTO the servicioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated servicioDTO,
     * or with status 400 (Bad Request) if the servicioDTO is not valid,
     * or with status 500 (Internal Server Error) if the servicioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/servicios")
    @Timed
    public ResponseEntity<ServicioDTO> updateServicio(@Valid @RequestBody ServicioDTO servicioDTO) throws URISyntaxException {
        log.debug("REST request to update Servicio : {}", servicioDTO);
        if (servicioDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ServicioDTO result = servicioService.save(servicioDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, servicioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /servicios : get all the servicios.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of servicios in body
     */
    @GetMapping("/servicios")
    @Timed
    public List<ServicioDTO> getAllServicios(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Servicios");
        return servicioService.findAll();
    }

    /**
     * GET  /servicios/:id : get the "id" servicio.
     *
     * @param id the id of the servicioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the servicioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/servicios/{id}")
    @Timed
    public ResponseEntity<ServicioDTO> getServicio(@PathVariable Long id) {
        log.debug("REST request to get Servicio : {}", id);
        Optional<ServicioDTO> servicioDTO = servicioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(servicioDTO);
    }

    /**
     * DELETE  /servicios/:id : delete the "id" servicio.
     *
     * @param id the id of the servicioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/servicios/{id}")
    @Timed
    public ResponseEntity<Void> deleteServicio(@PathVariable Long id) {
        log.debug("REST request to delete Servicio : {}", id);
        servicioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
