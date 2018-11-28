package com.ubal.test.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Vehiculo entity.
 */
public class VehiculoDTO implements Serializable {

    private Long id;

    @NotNull
    @Min(value = 1950)
    @Max(value = 2018)
    private Integer anio;

    @NotNull
    @Size(min = 6, max = 7)
    @Pattern(regexp = "^[A-Z]{2}\\d{3}[A-Z]{2}|[A-Z]{3}[0-9]{3}$")
    private String patente;

    @NotNull
    private Integer kilometraje;

    private Long modeloId;

    private String modeloNombre;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAnio() {
        return anio;
    }

    public void setAnio(Integer anio) {
        this.anio = anio;
    }

    public String getPatente() {
        return patente;
    }

    public void setPatente(String patente) {
        this.patente = patente;
    }

    public Integer getKilometraje() {
        return kilometraje;
    }

    public void setKilometraje(Integer kilometraje) {
        this.kilometraje = kilometraje;
    }

    public Long getModeloId() {
        return modeloId;
    }

    public void setModeloId(Long modeloId) {
        this.modeloId = modeloId;
    }

    public String getModeloNombre() {
        return modeloNombre;
    }

    public void setModeloNombre(String modeloNombre) {
        this.modeloNombre = modeloNombre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VehiculoDTO vehiculoDTO = (VehiculoDTO) o;
        if (vehiculoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vehiculoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VehiculoDTO{" +
            "id=" + getId() +
            ", anio=" + getAnio() +
            ", patente='" + getPatente() + "'" +
            ", kilometraje=" + getKilometraje() +
            ", modelo=" + getModeloId() +
            ", modelo='" + getModeloNombre() + "'" +
            "}";
    }
}
