package com.notification.dutynotifier.mapper;

import com.notification.dutynotifier.dto.notificationTemplate.NotificationTemplateDto;
import com.notification.dutynotifier.entity.notificationTemplate.NotificationTemplate;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-28T18:43:52+0300",
    comments = "version: 1.6.3, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.4.1.jar, environment: Java 21.0.11 (Microsoft)"
)
@Component
public class NotificationTemplateMapperImpl implements NotificationTemplateMapper {

    @Override
    public NotificationTemplateDto toResponse(NotificationTemplate template) {
        if ( template == null ) {
            return null;
        }

        NotificationTemplateDto notificationTemplateDto = new NotificationTemplateDto();

        notificationTemplateDto.setTodayTemplate( template.getTodayTemplate() );
        notificationTemplateDto.setScheduleTemplate( template.getScheduleTemplate() );

        return notificationTemplateDto;
    }

    @Override
    public NotificationTemplate toEntity(NotificationTemplateDto dto) {
        if ( dto == null ) {
            return null;
        }

        NotificationTemplate.NotificationTemplateBuilder notificationTemplate = NotificationTemplate.builder();

        notificationTemplate.todayTemplate( dto.getTodayTemplate() );
        notificationTemplate.scheduleTemplate( dto.getScheduleTemplate() );

        return notificationTemplate.build();
    }
}
