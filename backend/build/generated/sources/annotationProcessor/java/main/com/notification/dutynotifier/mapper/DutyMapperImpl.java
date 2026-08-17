package com.notification.dutynotifier.mapper;

import com.notification.dutynotifier.dto.response.DutyResponse;
import com.notification.dutynotifier.entity.duty.Duty;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-28T18:43:52+0300",
    comments = "version: 1.6.3, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.4.1.jar, environment: Java 21.0.11 (Microsoft)"
)
@Component
public class DutyMapperImpl implements DutyMapper {

    @Override
    public DutyResponse toResponse(Duty duty) {
        if ( duty == null ) {
            return null;
        }

        DutyResponse dutyResponse = new DutyResponse();

        dutyResponse.setId( duty.getId() );
        dutyResponse.setDutyDate( duty.getDutyDate() );

        dutyResponse.setEmployees( mapEmployees(duty) );
        dutyResponse.setEmployeeIds( mapEmployeeIds(duty) );

        return dutyResponse;
    }
}
