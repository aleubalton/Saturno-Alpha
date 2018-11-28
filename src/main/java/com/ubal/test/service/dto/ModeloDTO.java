package com.ubal.test.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.ubal.test.domain.enumeration.Marca;
import com.ubal.test.domain.enumeration.Categoria;

/**
 * A DTO for the Modelo entity.
 */
public class ModeloDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 4, max = 4)
    private String codigo;

    @NotNull
    private String nombre;

    @NotNull
    private Marca marca;

    @NotNull
    private Categoria categoria;

    @NotNull
    @Min(value = 1950)
    @Max(value = 2018)
    private Integer anioInicioProduccion;

    @Min(value = 1950)
    @Max(value = 2018)
    private Integer anioFinProduccion;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Marca getMarca() {
        return marca;
    }

    public void setMarca(Marca marca) {
        this.marca = marca;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Integer getAnioInicioProduccion() {
        return anioInicioProduccion;
    }

    public void setAnioInicioProduccion(Integer anioInicioProduccion) {
        this.anioInicioProduccion = anioInicioProduccion;
    }

    public Integer getAnioFinProduccion() {
        return anioFinProduccion;
    }

    public void setAnioFinProduccion(Integer anioFinProduccion) {
        this.anioFinProduccion = anioFinProduccion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ModeloDTO modeloDTO = (ModeloDTO) o;
        if (modeloDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), modeloDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ModeloDTO{" +
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
