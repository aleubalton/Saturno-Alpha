package com.ubal.test.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.ubal.test.domain.enumeration.Categoria;

/**
 * A Servicio.
 */
@Entity
@Table(name = "servicio")
public class Servicio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Size(min = 4, max = 4)
    @Column(name = "codigo", length = 4, nullable = false)
    private String codigo;

    @NotNull
    @Column(name = "kilometraje", nullable = false)
    private Integer kilometraje;

    @NotNull
    @Column(name = "duracion", nullable = false)
    private Integer duracion;

    @NotNull
    @Column(name = "precio", nullable = false)
    private Integer precio;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "categoria", nullable = false)
    private Categoria categoria;

    @ManyToOne(optional = false)
    @NotNull
    private TipoDeServicio tipo;

    @ManyToMany
    @NotNull
    @JoinTable(name = "servicio_tarea",
               joinColumns = @JoinColumn(name="servicios_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="tareas_id", referencedColumnName="id"))
    private Set<Tarea> tareas = new HashSet<>();

    @ManyToMany(mappedBy = "servicios")
    @JsonIgnore
    private Set<Turno> turnos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Servicio nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCodigo() {
        return codigo;
    }

    public Servicio codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Integer getKilometraje() {
        return kilometraje;
    }

    public Servicio kilometraje(Integer kilometraje) {
        this.kilometraje = kilometraje;
        return this;
    }

    public void setKilometraje(Integer kilometraje) {
        this.kilometraje = kilometraje;
    }

    public Integer getDuracion() {
        return duracion;
    }

    public Servicio duracion(Integer duracion) {
        this.duracion = duracion;
        return this;
    }

    public void setDuracion(Integer duracion) {
        this.duracion = duracion;
    }

    public Integer getPrecio() {
        return precio;
    }

    public Servicio precio(Integer precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Integer precio) {
        this.precio = precio;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public Servicio categoria(Categoria categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public TipoDeServicio getTipo() {
        return tipo;
    }

    public Servicio tipo(TipoDeServicio tipoDeServicio) {
        this.tipo = tipoDeServicio;
        return this;
    }

    public void setTipo(TipoDeServicio tipoDeServicio) {
        this.tipo = tipoDeServicio;
    }

    public Set<Tarea> getTareas() {
        return tareas;
    }

    public Servicio tareas(Set<Tarea> tareas) {
        this.tareas = tareas;
        return this;
    }

    public Servicio addTarea(Tarea tarea) {
        this.tareas.add(tarea);
        tarea.getServicios().add(this);
        return this;
    }

    public Servicio removeTarea(Tarea tarea) {
        this.tareas.remove(tarea);
        tarea.getServicios().remove(this);
        return this;
    }

    public void setTareas(Set<Tarea> tareas) {
        this.tareas = tareas;
    }

    public Set<Turno> getTurnos() {
        return turnos;
    }

    public Servicio turnos(Set<Turno> turnos) {
        this.turnos = turnos;
        return this;
    }

    public Servicio addTurno(Turno turno) {
        this.turnos.add(turno);
        turno.getServicios().add(this);
        return this;
    }

    public Servicio removeTurno(Turno turno) {
        this.turnos.remove(turno);
        turno.getServicios().remove(this);
        return this;
    }

    public void setTurnos(Set<Turno> turnos) {
        this.turnos = turnos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Servicio servicio = (Servicio) o;
        if (servicio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), servicio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Servicio{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", kilometraje=" + getKilometraje() +
            ", duracion=" + getDuracion() +
            ", precio=" + getPrecio() +
            ", categoria='" + getCategoria() + "'" +
            "}";
    }
}
