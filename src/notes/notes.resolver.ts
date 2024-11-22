import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NotesService } from './notes.service';
import { Note } from './entities/note.entity';
import { CreateNoteInput } from './dto/create-note.input';
import { UpdateNoteInput } from './dto/update-note.input';

@Resolver(() => Note)
export class NotesResolver {
  constructor(private readonly notesService: NotesService) {}

  @Mutation(() => Note)
  createNote(
    @Args('createNoteInput') createNoteInput: CreateNoteInput,
  ): Promise<Note> {
    return this.notesService.create(createNoteInput);
  }

  @Query(() => [Note], { name: 'notes' })
  findAll(): Promise<Note[]> {
    return this.notesService.findAll();
  }

  @Query(() => Note, { name: 'note' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Note> {
    return this.notesService.findOne(id);
  }

  @Mutation(() => Note)
  updateNote(
    @Args('updateNoteInput') updateNoteInput: UpdateNoteInput,
  ): Promise<Note> {
    return this.notesService.update(updateNoteInput.id, updateNoteInput);
  }

  @Mutation(() => Note)
  removeNote(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Note> {
    return this.notesService.remove(id);
  }
}
