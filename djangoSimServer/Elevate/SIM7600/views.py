# sim7600/views.py

from django.http import JsonResponse
from .corecode import send_sms, call_handling
import serial

def make_call(request):
    try:
        serial_port = 'COM14'  # Adjust this according to your setup
        ser = serial.Serial(serial_port, baudrate=9600)
        # Assuming caller_number is passed through request.POST or request.GET
        caller_number = "+919326239563"
        call_handling(caller_number, ser)
        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})

def send_text_message(request):
    try:
        serial_port = 'COM14'  # Adjust this according to your setup
        ser = serial.Serial(serial_port, baudrate=9600)
        # Assuming phone_number and message are passed through request.POST or request.GET
        phone_number = "+919326239563"
        message = "baigan"
        send_sms(ser, phone_number, message)
        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})