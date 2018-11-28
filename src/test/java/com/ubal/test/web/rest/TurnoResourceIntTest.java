package com.ubal.test.web.rest;

import com.ubal.test.JhipsterApp;

import com.ubal.test.domain.Turno;
import com.ubal.test.domain.Agenda;
import com.ubal.test.domain.Servicio;
import com.ubal.test.domain.Cliente;
import com.ubal.test.domain.Vehiculo;
import com.ubal.test.repository.TurnoRepository;
import com.ubal.test.service.TurnoService;
import com.ubal.test.service.dto.TurnoDTO;
import com.ubal.test.service.mapper.TurnoMapper;
import com.ubal.test.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;


import static com.ubal.test.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.ubal.test.domain.enumeration.Estado;
/**
 * Test class for the TurnoResource REST controller.
 *
 * @see TurnoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class TurnoResourceIntTest {

    private static final Instant DEFAULT_FECHA_HORA = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_HORA = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Estado DEFAULT_ESTADO = Estado.RESERVADO;
    private static final Estado UPDATED_ESTADO = Estado.EXPIRADO;

    @Autowired
    private TurnoRepository turnoRepository;

    @Mock
    private TurnoRepository turnoRepositoryMock;

    @Autowired
    private TurnoMapper turnoMapper;

    @Mock
    private TurnoService turnoServiceMock;

    @Autowired
    private TurnoService turnoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTurnoMockMvc;

    private Turno turno;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TurnoResource turnoResource = new TurnoResource(turnoService);
        this.restTurnoMockMvc = MockMvcBuilders.standaloneSetup(turnoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Turno createEntity(EntityManager em) {
        Turno turno = new Turno()
            .fechaHora(DEFAULT_FECHA_HORA)
            .estado(DEFAULT_ESTADO);
        // Add required entity
        Agenda agenda = AgendaResourceIntTest.createEntity(em);
        em.persist(agenda);
        em.flush();
        turno.setAgenda(agenda);
        // Add required entity
        Servicio servicio = ServicioResourceIntTest.createEntity(em);
        em.persist(servicio);
        em.flush();
        turno.getServicios().add(servicio);
        // Add required entity
        Cliente cliente = ClienteResourceIntTest.createEntity(em);
        em.persist(cliente);
        em.flush();
        turno.setCliente(cliente);
        // Add required entity
        Vehiculo vehiculo = VehiculoResourceIntTest.createEntity(em);
        em.persist(vehiculo);
        em.flush();
        turno.setVehiculo(vehiculo);
        return turno;
    }

    @Before
    public void initTest() {
        turno = createEntity(em);
    }

    @Test
    @Transactional
    public void createTurno() throws Exception {
        int databaseSizeBeforeCreate = turnoRepository.findAll().size();

        // Create the Turno
        TurnoDTO turnoDTO = turnoMapper.toDto(turno);
        restTurnoMockMvc.perform(post("/api/turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turnoDTO)))
            .andExpect(status().isCreated());

        // Validate the Turno in the database
        List<Turno> turnoList = turnoRepository.findAll();
        assertThat(turnoList).hasSize(databaseSizeBeforeCreate + 1);
        Turno testTurno = turnoList.get(turnoList.size() - 1);
        assertThat(testTurno.getFechaHora()).isEqualTo(DEFAULT_FECHA_HORA);
        assertThat(testTurno.getEstado()).isEqualTo(DEFAULT_ESTADO);
    }

    @Test
    @Transactional
    public void createTurnoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = turnoRepository.findAll().size();

        // Create the Turno with an existing ID
        turno.setId(1L);
        TurnoDTO turnoDTO = turnoMapper.toDto(turno);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTurnoMockMvc.perform(post("/api/turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turnoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Turno in the database
        List<Turno> turnoList = turnoRepository.findAll();
        assertThat(turnoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFechaHoraIsRequired() throws Exception {
        int databaseSizeBeforeTest = turnoRepository.findAll().size();
        // set the field null
        turno.setFechaHora(null);

        // Create the Turno, which fails.
        TurnoDTO turnoDTO = turnoMapper.toDto(turno);

        restTurnoMockMvc.perform(post("/api/turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turnoDTO)))
            .andExpect(status().isBadRequest());

        List<Turno> turnoList = turnoRepository.findAll();
        assertThat(turnoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEstadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = turnoRepository.findAll().size();
        // set the field null
        turno.setEstado(null);

        // Create the Turno, which fails.
        TurnoDTO turnoDTO = turnoMapper.toDto(turno);

        restTurnoMockMvc.perform(post("/api/turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turnoDTO)))
            .andExpect(status().isBadRequest());

        List<Turno> turnoList = turnoRepository.findAll();
        assertThat(turnoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTurnos() throws Exception {
        // Initialize the database
        turnoRepository.saveAndFlush(turno);

        // Get all the turnoList
        restTurnoMockMvc.perform(get("/api/turnos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(turno.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaHora").value(hasItem(DEFAULT_FECHA_HORA.toString())))
            .andExpect(jsonPath("$.[*].estado").value(hasItem(DEFAULT_ESTADO.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllTurnosWithEagerRelationshipsIsEnabled() throws Exception {
        TurnoResource turnoResource = new TurnoResource(turnoServiceMock);
        when(turnoServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restTurnoMockMvc = MockMvcBuilders.standaloneSetup(turnoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTurnoMockMvc.perform(get("/api/turnos?eagerload=true"))
        .andExpect(status().isOk());

        verify(turnoServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllTurnosWithEagerRelationshipsIsNotEnabled() throws Exception {
        TurnoResource turnoResource = new TurnoResource(turnoServiceMock);
            when(turnoServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restTurnoMockMvc = MockMvcBuilders.standaloneSetup(turnoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restTurnoMockMvc.perform(get("/api/turnos?eagerload=true"))
        .andExpect(status().isOk());

            verify(turnoServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getTurno() throws Exception {
        // Initialize the database
        turnoRepository.saveAndFlush(turno);

        // Get the turno
        restTurnoMockMvc.perform(get("/api/turnos/{id}", turno.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(turno.getId().intValue()))
            .andExpect(jsonPath("$.fechaHora").value(DEFAULT_FECHA_HORA.toString()))
            .andExpect(jsonPath("$.estado").value(DEFAULT_ESTADO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTurno() throws Exception {
        // Get the turno
        restTurnoMockMvc.perform(get("/api/turnos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTurno() throws Exception {
        // Initialize the database
        turnoRepository.saveAndFlush(turno);

        int databaseSizeBeforeUpdate = turnoRepository.findAll().size();

        // Update the turno
        Turno updatedTurno = turnoRepository.findById(turno.getId()).get();
        // Disconnect from session so that the updates on updatedTurno are not directly saved in db
        em.detach(updatedTurno);
        updatedTurno
            .fechaHora(UPDATED_FECHA_HORA)
            .estado(UPDATED_ESTADO);
        TurnoDTO turnoDTO = turnoMapper.toDto(updatedTurno);

        restTurnoMockMvc.perform(put("/api/turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turnoDTO)))
            .andExpect(status().isOk());

        // Validate the Turno in the database
        List<Turno> turnoList = turnoRepository.findAll();
        assertThat(turnoList).hasSize(databaseSizeBeforeUpdate);
        Turno testTurno = turnoList.get(turnoList.size() - 1);
        assertThat(testTurno.getFechaHora()).isEqualTo(UPDATED_FECHA_HORA);
        assertThat(testTurno.getEstado()).isEqualTo(UPDATED_ESTADO);
    }

    @Test
    @Transactional
    public void updateNonExistingTurno() throws Exception {
        int databaseSizeBeforeUpdate = turnoRepository.findAll().size();

        // Create the Turno
        TurnoDTO turnoDTO = turnoMapper.toDto(turno);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTurnoMockMvc.perform(put("/api/turnos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(turnoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Turno in the database
        List<Turno> turnoList = turnoRepository.findAll();
        assertThat(turnoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTurno() throws Exception {
        // Initialize the database
        turnoRepository.saveAndFlush(turno);

        int databaseSizeBeforeDelete = turnoRepository.findAll().size();

        // Get the turno
        restTurnoMockMvc.perform(delete("/api/turnos/{id}", turno.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Turno> turnoList = turnoRepository.findAll();
        assertThat(turnoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Turno.class);
        Turno turno1 = new Turno();
        turno1.setId(1L);
        Turno turno2 = new Turno();
        turno2.setId(turno1.getId());
        assertThat(turno1).isEqualTo(turno2);
        turno2.setId(2L);
        assertThat(turno1).isNotEqualTo(turno2);
        turno1.setId(null);
        assertThat(turno1).isNotEqualTo(turno2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TurnoDTO.class);
        TurnoDTO turnoDTO1 = new TurnoDTO();
        turnoDTO1.setId(1L);
        TurnoDTO turnoDTO2 = new TurnoDTO();
        assertThat(turnoDTO1).isNotEqualTo(turnoDTO2);
        turnoDTO2.setId(turnoDTO1.getId());
        assertThat(turnoDTO1).isEqualTo(turnoDTO2);
        turnoDTO2.setId(2L);
        assertThat(turnoDTO1).isNotEqualTo(turnoDTO2);
        turnoDTO1.setId(null);
        assertThat(turnoDTO1).isNotEqualTo(turnoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(turnoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(turnoMapper.fromId(null)).isNull();
    }
}
