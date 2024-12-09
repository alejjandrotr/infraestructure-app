
# Project Overview / Descripción del Proyecto

## English

This project is based on the TailAdmin template, featuring a layout and sidebar. The original logo is maintained while a new one is being developed. In the development of this project, several libraries and tools were utilized, including **Zod** for schema validation, **Chart.js** for data visualization, **react-hook-form** for managing form state and validation, and **Faker** for generating mock data.

### Purpose

The project aims to serve as a back-office application for managing the structure of a cinema hall. Some features are still under development, including:

- A seating map with seat locations.
- Displaying reserved seats for each booking.

### Running the Project

To run this project locally, follow these steps:

1. Install dependencies: 
	```bash
   npm install

2. Start the application: 
	```bash
   npm run start
	 ```

3. Run tests:
	```bash
   npm run test
	```
4. Start Storybook: 
	```bash
   npm run storybook
	```
### Existing Data Structures

1. **Users**: These are the individuals who operate the system. An admin user is automatically generated with the password `12345`.
2. **Rooms**: These represent the different screening rooms in the cinema. (The mock data produces 600 entries, which is purely for testing purposes.)
3. **Seats**: Each room contains seats.
4. **Reservations**: Each room can be reserved for a specific period.

The core of the application is located in the `core` folder.

### Repositories

To manage data, an interface repository with CRUD operations has been created. A localStorage implementation is planned for future versions; currently, mock data is generated directly from JSON files that produce random data.

#### Example Usage

- **Sala Definition**: 
 ```typescript
	  export const SalaSchema = z.object({
		  id: z.number().optional(),
		  codigo: z.string().min(1, 'Debe colocar más de una letra'),
		  capacidad: z.number(),
		  categoriaId: z.number(),
		  largo: z.number(),
		  ancho: z.number(),
	  });

	  export const SalaSchemaFilter = SalaSchema.partial();

	  export type Sala = z.infer<typeof SalaSchema> & {
		categoriaNombre?: string;
		asientos?: Asiento[];
	  };

	  export const createNewSala: () => Sala = () => {
		return {
		  codigo: '',
		  categoriaId: 1,
		  capacidad: 25,
		  largo: 12,
		  ancho: 8,
		};
	  };
  ```
  
- **Sala API**: Implement your Sala API logic here.
```typescript
	  export const SalaSchema = z.object({
		  id: z.number().optional(),
		  codigo: z.string().min(1, 'Debe colocar más de una letra'),
		  capacidad: z.number(),
		  categoriaId: z.number(),
		  largo: z.number(),
		  ancho: z.number(),
	  });

	  export const SalaSchemaFilter = SalaSchema.partial();

	  export type Sala = z.infer<typeof SalaSchema> & {
		categoriaNombre?: string;
		asientos?: Asiento[];
	  };

	  export const createNewSala: () => Sala = () => {
		return {
		  codigo: '',
		  categoriaId: 1,
		  capacidad: 25,
		  largo: 12,
		  ancho: 8,
		};
	  };
  ```

- **Testing the API**: Define the logic for testing the API in your test files.

### BaseRepository

The `BaseRepository` defines methods for retrieving, editing, adding, and deleting data from various repositories. It can be extended to modify any behaviors. Examples of this can be seen by exploring the code.

The logic is event-based; therefore, operations that change data should trigger update events.

### Components Overview

Each component's definition is established in Storybook, allowing you to visualize them.

#### CRUD Page Structure

- **Listing**: The `Column` DTO establishes which elements are displayed for each entity.

```typescript
	export interface Column {
		 key: string; // Attribute name in the object
		 title: string; // Title displayed in headers
		 onShow?: (data: unknown) => string; // Returns a formatted string
		 component?: (element: unknown) => ReactElement; // Returns a custom component
	}
```

- To display a list, use `GenericList` by passing these columns and the repository created in the core.
```typescript
	<GenericList {...{ columns, repository: userRepository }} />
```

#### Create or Edit

This allows calling a component in a modal to display a form. This component is fully customizable for each entity.

```typescript
	<CreateEdit
		isOpen={isOpen}
		onClose={() => {
			setTimeout(() => setIsOpenModal(false), 100);
		}}
		element={editElement}
		repository={userRepository}
	/>
```

##### Example of an Edit Component

In this section, define the entity type and validation schema based on Zod.
```typescript
	const { register, handleSubmit, formState, reset } = useForm<User>({
		resolver: zodResolver(UserSchema),
		values: { ...element },
	});
```

Submit the form when data is valid:
```typescript
	const onSubmit = async (data: User) => {
		try {
			setIsLoading(true);
			await submitToCreateOrUpdate<User>(data, repository);
			cerrar();
		} catch (e) {
		} finally {
			setIsLoading(false);
		}
	};
```

The CRUD should be wrapped in a modal component that defines the form and validations.
```typescript
	<Modal
		title="Gestionar Usuario"
		{...modalProps}
		onSubmit={onSubmit}
		handleSubmit={handleSubmit}
		{...{ isValid: !isValid || isLoading }}
		onClose={cerrar}
	> 
		... 
	</Modal>
```
Each input field must have corresponding inputs where the `name` matches the attribute name in the Zod schema.
```typescript
	<InputText
		name="usuario"
		placeholder="Escriba el nombre de usuario"
		error={errors.usuario}
		label="Nombre de Usuario"
		register={register}
	/>
```

### Complete Example

```typescript
	export const CreateEdit = ({ element, repository, ...modalProps }: ModalProps & CreateEditProp<User>) => {

		const [isLoading, setIsLoading] = useState(false);
		const { register, handleSubmit, formState, reset } = useForm<User>({
		resolver: zodResolver(UserSchema),
		values: { ...element },
		});

		  

		const cerrar = () => {
			reset();
			modalProps.onClose();
		};

	  

		const { errors, isValid } = formState;

	  

		const onSubmit = async (data: User) => {
			try {
				setIsLoading(true);
				await submitToCreateOrUpdate<User>(data, repository);
				cerrar();
			} catch (e) {
			} finally {
				setIsLoading(false);
			}
		};

	  

		return (

			<Modal
				title="Gestionar Usuario"
				{...modalProps}
				onSubmit={onSubmit}
				handleSubmit={handleSubmit}
				{...{ isValid: !isValid || isLoading }}
				onClose={cerrar}
			>

				<div className="p-2.5">
					<div className="mb-4.5 grid grid-cols-1 gap-6 xl:grid-cols-2">
						
						<InputText
							name="usuario"
							placeholder="Escriba el nombre de usuario"
							error={errors.usuario}
							label="Nombre de Usuario"
							register={register}
						/>
						  ...
					</div>
				</div>
		</Modal>
	);
};
```
### Filter Component

The filter component is optional but functions similarly to create or edit components.

## Future Plans

- Add a details screen for viewing reservations where users can see which seats have been taken and view a seating plan.
- Add functionality to move seats within a seating plan in the seat management CRUD interface.

