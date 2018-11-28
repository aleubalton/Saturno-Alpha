package com.ubal.test.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.ubal.test.service.VehiculoService;
import com.ubal.test.web.rest.errors.BadRequestAlertException;
import com.ubal.test.web.rest.util.HeaderUtil;
import com.ubal.test.service.dto.VehiculoDTO;
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
 * REST controller for managing Vehiculo.
 */
@RestController
@RequestMapping("/api")
public class VehiculoResource {

    private final Logger log = LoggerFactory.getLogger(VehiculoResource.class);

    private static final String ENTITY_NAME = "vehiculo";

    private final VehiculoService vehiculoService;

    public VehiculoResource(VehiculoService vehiculoService) {
        this.vehiculoService = vehiculoService;
    }

    /**
     * POST  /vehiculos : Create a new vehiculo.
     *
     * @param vehiculoDTO the vehiculoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vehiculoDTO, or with status 400 (Bad Request) if the vehiculo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vehiculos")
    @Timed
    public ResponseEntity<VehiculoDTO> createVehiculo(@Valid @RequestBody VehiculoDTO vehiculoDTO) throws URISyntaxException {
        log.debug("REST request to save Vehiculo : {}", vehiculoDTO);
        if (vehiculoDTO.getId() != null) {
            throw new BadRequestAlertException("A new vehiculo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VehiculoDTO result = vehiculoService.save(vehiculoDTO);
        return ResponseEntity.created(new URI("/api/vehiculos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vehiculos : Updates an existing vehiculo.
     *
     * @param vehiculoDTO the vehiculoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vehiculoDTO,
     * or with status 400 (Bad Request) if the vehiculoDTO is not valid,
     * or with status 500 (Internal Server Error) if the vehiculoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vehiculos")
    @Timed
    public ResponseEntity<VehiculoDTO> updateVehiculo(@Valid @RequestBody VehiculoDTO vehiculoDTO) throws URISyntaxException {
        log.debug("REST request to update Vehiculo : {}", vehiculoDTO);
        if (vehiculoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VehiculoDTO result = vehiculoService.save(vehiculoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vehiculoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vehiculos : get all the vehiculos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of vehiculos in body
     */
    @GetMapping("/vehiculos")
    @Timed
    public List<VehiculoDTO> getAllVehiculos() {
        log.debug("REST request to get all Vehiculos");
        return vehiculoService.findAll();
    }

    /**
     * GET  /vehiculos/:id : get the "id" vehiculo.
     *
     * @param id the id of the vehiculoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vehiculoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/vehiculos/{id}")
    @Timed
    public ResponseEntity<VehiculoDTO> getVehiculo(@PathVariable Long id) {
        log.debug("REST request to get Vehiculo : {}", id);
        Optional<VehiculoDTO> vehiculoDTO = vehiculoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(vehiculoDTO);
    }

    /**
     * DELETE  /vehiculos/:id : delete the "id" vehiculo.
     *
     * @param id the id of the vehiculoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vehiculos/{id}")
    @Timed
    public ResponseEntity<Void> deleteVehiculo(@PathVariable Long id) {
        log.debug("REST request to delete Vehiculo : {}", id);
        vehiculoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
