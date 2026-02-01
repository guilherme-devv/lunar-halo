import { Clock, Calendar, Info } from 'lucide-react';
import type { Schedule } from '../../context/RideContext';
import {
  ScheduleWrapper,
  ToggleContainer,
  ToggleOption,
  DateTimeContainer,
  DateTimeLabel,
  LabelText,
  DateTimeInput,
  ScheduleInfo,
} from './styles';

export interface ScheduleToggleProps {
  schedule: Schedule;
  onToggleImmediate: () => void;
  onDateChange: (date: Date | null) => void;
}

export function ScheduleToggle({
  schedule,
  onToggleImmediate,
  onDateChange,
}: ScheduleToggleProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      // Combine date and time if we have both
      const dateTimeString = `${value}T${schedule.date ?
        schedule.date.toTimeString().slice(0, 5) : '09:00'}`;
      onDateChange(new Date(dateTimeString));
    } else {
      onDateChange(null);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && schedule.date) {
      const dateStr = schedule.date.toISOString().split('T')[0];
      onDateChange(new Date(`${dateStr}T${value}`));
    } else if (value) {
      // Create date with today
      const today = new Date().toISOString().split('T')[0];
      onDateChange(new Date(`${today}T${value}`));
    }
  };

  // Get min date (today)
  const today = new Date().toISOString().split('T')[0];

  // Format current date for input
  const currentDateValue = schedule.date
    ? schedule.date.toISOString().split('T')[0]
    : '';

  // Format current time for input
  const currentTimeValue = schedule.date
    ? schedule.date.toTimeString().slice(0, 5)
    : '';

  return (
    <ScheduleWrapper>
      <ToggleContainer>
        <ToggleOption
          type="button"
          $isActive={schedule.isImmediate}
          onClick={() => !schedule.isImmediate && onToggleImmediate()}
        >
          <Clock size={18} />
          Agora
        </ToggleOption>
        <ToggleOption
          type="button"
          $isActive={!schedule.isImmediate}
          onClick={() => schedule.isImmediate && onToggleImmediate()}
        >
          <Calendar size={18} />
          Agendar
        </ToggleOption>
      </ToggleContainer>

      {!schedule.isImmediate && (
        <DateTimeContainer>
          <DateTimeLabel>
            <LabelText>Data</LabelText>
            <DateTimeInput
              type="date"
              value={currentDateValue}
              min={today}
              onChange={handleDateChange}
            />
          </DateTimeLabel>

          <DateTimeLabel>
            <LabelText>Horário</LabelText>
            <DateTimeInput
              type="time"
              value={currentTimeValue}
              onChange={handleTimeChange}
            />
          </DateTimeLabel>

          {schedule.date && (
            <ScheduleInfo>
              <Info size={16} />
              Viagem agendada para {schedule.date.toLocaleDateString('pt-BR')} às {schedule.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </ScheduleInfo>
          )}
        </DateTimeContainer>
      )}
    </ScheduleWrapper>
  );
}
