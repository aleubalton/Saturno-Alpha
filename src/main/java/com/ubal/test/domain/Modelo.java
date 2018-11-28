package com.ubal.test.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.ubal.test.domain.enumeration.Marca;

import com.ubal.test.domain.enumeration.Categoria;

/**
 * A Modelo.
 */
@Entity
@Table(name = "modelo")
public class Modelo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 4, max = 4)
    @Column(name = "codigo", length = 4, nullable = false)
    private String codigo;

    @NotNull
    @Column(name = "nombre", nullable = false)
    private String nombre;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "marca", nullable = false)
    private Marca marca;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "categoria", nullable = false)
    private Categoria categoria;

    @NotNull
    @Min(value = 1950)
    @Max(value = 2018)
    @Column(name = "anio_inicio_produccion", nullable = false)
    private Integer anioInicioProduccion;

    @Min(value = 1950)
    @Max(value = 2018)
    @Column(name = "anio_fin_produccion")
    private Integer anioFinProduccion;

    @OneToMany(mappedBy = "modelo")
    private Set<Vehiculo> vehiculos = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public Modelo codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public Modelo nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Marca getMarca() {
        return marca;
    }

    public Modelo marca(Marca marca) {
        this.marca = marca;
        return this;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public Modelo categoria(Categoria categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Integer getAnioInicioProduccion() {
        return anioInicioProduccion;
    }

    public Modelo anioInicioProduccion(Integer anioInicioProduccion) {
        this.anioInicioProduccion = anioInicioProduccion;
        return this;
    }

    public void setAnioInicioProduccion(Integer anioInicioProduccion) {
        this.anioInicioProduccion = anioInicioProduccion;
    }

    public Integer getAnioFinProduccion() {
        return anioFinProduccion;
    }

    public Modelo anioFinProduccion(Integer anioFinProduccion) {
        this.anioFinProduccion = anioFinProduccion;
        return this;
    }

    public void setAnioFinProduccion(Integer anioFinProduccion) {
        this.anioFinProduccion = anioFinProduccion;
    }

    public Set<Vehiculo> getVehiculos() {
        return vehiculos;
    }

    public Modelo vehiculos(Set<Vehiculo> vehiculos) {
        this.vehiculos = vehiculos;
        return this;
    }

    public Modelo addVehiculo(Vehiculo vehiculo) {
        this.vehiculos.add(vehiculo);
        vehiculo.setModelo(this);
        return this;
    }

    public Modelo removeVehiculo(Vehiculo vehiculo) {
        this.vehiculos.remove(vehiculo);
        vehiculo.setModelo(null);
        return this;
    }

    public void setVehiculos(Set<Vehiculo> vehiculos) {
        this.vehiculos = vehiculos;
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
        Modelo modelo = (Modelo) o;
        if (modelo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), modelo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Modelo{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", marca='" + getMarca() + "'" +
            ", categoria='" + getCategoria() + "'" +
            ", anioInicioProduccion=" + getAnioInicioProduccion() +
            ", anioFinProduccion=" + getAnioFinProduccion() +
            "}";
    }
}
