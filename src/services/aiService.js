import { OpenAI } from 'openai';

import axios from 'axios';
import { Logger } from '../utils/logger.js';

import dotenv from 'dotenv';
dotenv.config();


const openaiApiKey = process.env.OPENAI_API_KEY;
const huggingFaceApiKey = process.env.HUGGINGFACE_API_KEY;

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

const huggingFaceEndpoint =
  'https://api-inference.huggingface.co/models/VincentMuriuki/legal-summarizer';

export const generateCommitMessage = async (diff)=> {
  try {
    Logger.info('Using OpenAI to draft a commit message...');
    const draft = await generateWithOpenAI(diff);

    Logger.info('Using Hugging Face to refine the draft...', draft);
    return draft;
    // return await refineWithHuggingFace(draft);
  } catch (error) {
    Logger.error('Initial attempt failed. Trying fallback options...', {
      error,
    });

    try {
      Logger.info(
        'Fallback: Using Hugging Face to generate a commit message...'
      );
      const draftFromHuggingFace = await generateWithHuggingFace(diff);
      return draftFromHuggingFace;
    } catch (fallbackError) {
      Logger.error('Both services failed. Returning fallback.', {
        fallbackError,
      });
      return 'Fallback: Could not generate a commit message.';
    }
  }
};

const refineWithHuggingFace = async (draft) => {
  try {
    const response = await axios.post(
      huggingFaceEndpoint,
      { inputs: `Refine this commit message: "${draft}"` },
      { headers: { Authorization: `Bearer ${huggingFaceApiKey}` } }
    );

    const refinedMessage = response.data[0]?.generated_text?.trim();

    if (!refinedMessage) {
      throw new Error('Hugging Face returned an empty refinement.');
    }

    return refinedMessage;
  } catch (error) {
    Logger.error('Hugging Face refinement failed:', error);
    throw error;
  }
};

const generateWithOpenAI = async (diff) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Or use "gpt-4" for GPT-4
      messages: [
        // {
        //   role: 'system',
        //   content: 'You are a helpful assistant.',
        // },
        {
          role: 'user',
          content: `Kindly help in generating a commit message for the below changes \n\n ${diff}`,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    Logger.error('Error generating with OpenAI', error);
    throw new Error('Failed to generate response with OpenAI.');
  }
};

const generateWithHuggingFace = async (diff) => {
  try {
    const response = await axios.post(
      huggingFaceEndpoint,
      { inputs: diff },
      { headers: { Authorization: `Bearer ${huggingFaceApiKey}` } }
    );

    const commitMessage = response.data[0]?.generated_text?.trim();

    if (!commitMessage) {
      throw new Error('Hugging Face returned an empty message.');
    }

    return commitMessage;
  } catch (error) {
    Logger.error('Hugging Face Error:', error);
    throw error;
  }
};
