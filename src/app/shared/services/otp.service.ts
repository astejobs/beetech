import { SmsRequest } from './../classes/sms-request';
import { VerifyOtp } from './../classes/verify-otp';
import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private apiService: WebRequestService) { }

  getOtp(smsRequest: SmsRequest) {
    return this.apiService.getOtp(smsRequest);
  }

  verifyOtp(verifyOtp: VerifyOtp) {
    return this.apiService.verifyOtp(verifyOtp);
  }

}
