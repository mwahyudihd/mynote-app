import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoteDocument } from './notes.schema';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';

@Injectable()
export class NotesService {
  constructor(@InjectModel('Note') private noteModel: Model<NoteDocument>) {}

  async create(createNoteInput: CreateNoteInput): Promise<Note> {
    const createdNote = new this.noteModel(createNoteInput);
    const savedNote = await createdNote.save();
    return this.mapToGraphQLType(savedNote);
  }

  async findAll(): Promise<Note[]> {
    const notes = await this.noteModel.find().exec();
    return notes.map(this.mapToGraphQLType);
  }

  async findOne(id: string): Promise<Note> {
    const note = await this.noteModel.findById(id).exec();
    if (!note) {
      throw new Error('Note not found');
    }
    return this.mapToGraphQLType(note);
  }

  async update(id: string, updateNoteInput: UpdateNoteInput): Promise<Note> {
    const updatedNote = await this.noteModel
      .findByIdAndUpdate(id, updateNoteInput, { new: true })
      .exec();
    return this.mapToGraphQLType(updatedNote);
  }

  async remove(id: string): Promise<Note> {
    const deletedNote = await this.noteModel.findByIdAndDelete(id).exec();
    return this.mapToGraphQLType(deletedNote);
  }

  private mapToGraphQLType(note: NoteDocument): Note {
    return {
      id: note._id.toString(),
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
    };
  }
}
