import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class GeolocationService {
  public url = process.env.HASURA_BASE_URL;
  constructor(private readonly httpService: HttpService) {}

  public async findAll(tableName: String, filters: Object = {}) {
    let query = '';
    if (filters) {
      Object.keys(filters).forEach((e) => {
        if (filters[e] && filters[e] != '') {
          query += `${e}:{_eq:"${filters[e]}"}`;
        }
      });
    }

    var data = {
      query: `query SearchAttendance {
        ${tableName}_aggregate(where:{${query}}) {
          aggregate {
            count
          }
        }
        ${tableName}(where:{${query}}) {
          id
          state_name
          state_cd
          district_name
          district_cd
          block_name
          grampanchayat_name
          village_ward_name
          udise_block_code
        }}`,
    };

    return await lastValueFrom(
      this.httpService
        .post(this.url, data, {
          headers: {
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
            'Content-Type': 'application/json',
          },
        })
        .pipe(map((res) => res.data)),
    );
  }
}
