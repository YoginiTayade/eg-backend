// camp.controller.ts

import {
	Controller,
	Post,
	UsePipes,
	ValidationPipe,
	Body,
	Req,
	UseGuards,
	Res,
	Param,
	Response,
	Patch,
} from '@nestjs/common';
import { CampService } from './camp.service';
import { AuthGuard } from 'src/modules/auth/auth.guard';

@Controller('camp')
export class CampController {
	constructor(private campService: CampService) {}

	@Post('/')
	@UsePipes(ValidationPipe)
	@UseGuards(new AuthGuard())
	registerCamp(
		@Body() body: any,
		@Req() request: any,
		@Res() response: Response,
	) {
		return this.campService.create(body, request, response);
	}

	@Post('/list')
	@UseGuards(new AuthGuard())
	campList(@Req() request: any, @Body() body: any, @Res() response: any) {
		return this.campService.campList(body, request, response);
	}

	@Post('/:id')
	@UseGuards(new AuthGuard())
	campById(
		@Req() request: any,
		@Body() body: any,
		@Param('id') id: number,
		@Res() response: any,
	) {
		return this.campService.campById(id, body, request, response);
	}

	@Patch('/:id')
	@UseGuards(new AuthGuard())
	updateCampDetails(
		@Req() request: any,
		@Body() body: any,
		@Param('id') id: number,
		@Res() response: any,
	) {
		return this.campService.updateCampDetails(id, body, request, response);
	}

	@Post('/create-consent/:id')
	@UseGuards(new AuthGuard())
	createConsentBenficiaries(
		@Req() request: any,
		@Body() body: any,
		@Res() response: any,
		@Param('id') id: number,
	) {
		return this.campService.createConsentBenficiaries(
			id,
			body,
			request,
			response,
		);
	}
}
