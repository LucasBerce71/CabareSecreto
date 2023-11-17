import { IParticipant } from "@/app/models/participant";
import ParticipantApiService from "./apiService";

export default class ParticipantOrchestrator {
    apiService = new ParticipantApiService();

    getAll = async () => {
        try {
            const response = await this.apiService.getAll();

            if (response.status !== 200) throw response;

            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    updateParticipant = async (participantId: string, updatedData?: IParticipant) => {
        try {
            const response = await this.apiService.updateParticipant(participantId, updatedData);

            if (response.status !== 200) throw response;

            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
};