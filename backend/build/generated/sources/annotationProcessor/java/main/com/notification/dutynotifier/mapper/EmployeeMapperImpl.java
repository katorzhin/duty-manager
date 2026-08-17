package com.notification.dutynotifier.mapper;

import com.notification.dutynotifier.dto.employeeRequest.EmployeeRequest;
import com.notification.dutynotifier.dto.response.EmployeeResponse;
import com.notification.dutynotifier.entity.employee.Employee;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-28T18:43:52+0300",
    comments = "version: 1.6.3, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.4.1.jar, environment: Java 21.0.11 (Microsoft)"
)
@Component
public class EmployeeMapperImpl implements EmployeeMapper {

    @Override
    public Employee toEntity(EmployeeRequest request) {
        if ( request == null ) {
            return null;
        }

        Employee.EmployeeBuilder employee = Employee.builder();

        employee.name( request.getName() );
        employee.email( request.getEmail() );
        employee.status( request.getStatus() );

        return employee.build();
    }

    @Override
    public EmployeeResponse toResponse(Employee employee) {
        if ( employee == null ) {
            return null;
        }

        EmployeeResponse employeeResponse = new EmployeeResponse();

        employeeResponse.setId( employee.getId() );
        employeeResponse.setName( employee.getName() );
        employeeResponse.setEmail( employee.getEmail() );
        employeeResponse.setStatus( employee.getStatus() );

        return employeeResponse;
    }
}
