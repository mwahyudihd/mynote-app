import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesService } from './notes.service';
import { NotesResolver } from './notes.resolver';
import { Note, NoteSchema } from './notes.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])],
  providers: [NotesService, NotesResolver],
})
export class NotesModule {}
