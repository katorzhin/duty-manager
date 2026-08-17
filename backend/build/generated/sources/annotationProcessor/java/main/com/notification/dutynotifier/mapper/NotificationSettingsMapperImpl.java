package com.notification.dutynotifier.mapper;

import com.notification.dutynotifier.dto.notificationSettings.NotificationSettingsDto;
import com.notification.dutynotifier.entity.notificationSettings.NotificationSettings;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-28T18:43:52+0300",
    comments = "version: 1.6.3, compiler: IncrementalProcessingEnvironment from gradle-language-java-9.4.1.jar, environment: Java 21.0.11 (Microsoft)"
)
@Component
public class NotificationSettingsMapperImpl implements NotificationSettingsMapper {

    @Override
    public NotificationSettingsDto toResponse(NotificationSettings settings) {
        if ( settings == null ) {
            return null;
        }

        NotificationSettingsDto notificationSettingsDto = new NotificationSettingsDto();

        notificationSettingsDto.setEnabled( settings.isEnabled() );
        notificationSettingsDto.setFrequency( settings.getFrequency() );
        notificationSettingsDto.setFirstNotificationTime( settings.getFirstNotificationTime() );
        notificationSettingsDto.setSecondNotificationTime( settings.getSecondNotificationTime() );

        return notificationSettingsDto;
    }

    @Override
    public NotificationSettings toEntity(NotificationSettingsDto request) {
        if ( request == null ) {
            return null;
        }

        NotificationSettings.NotificationSettingsBuilder notificationSettings = NotificationSettings.builder();

        notificationSettings.enabled( request.isEnabled() );
        notificationSettings.frequency( request.getFrequency() );
        notificationSettings.firstNotificationTime( request.getFirstNotificationTime() );
        notificationSettings.secondNotificationTime( request.getSecondNotificationTime() );

        return notificationSettings.build();
    }
}
